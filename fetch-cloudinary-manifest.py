#!/usr/bin/env python3
"""
Panchtatva OS — Cloudinary Manifest Sync
==========================================
Run this AFTER uploading photos/videos to Cloudinary (via their web dashboard,
Media Library, drag-and-drop — no coding needed for the upload step itself).

WHAT IT DOES
------------
Looks at everything you've uploaded under the `panchtatva/events/` folder in your
Cloudinary account, figures out which event each asset belongs to (from the folder
name, which should match the event's slug), and writes the correct entries into
js/media-manifest.js automatically — cover photo, extra photos, and videos.

SETUP (one-time)
-----------------
1. pip install cloudinary --break-system-packages
2. Get your credentials from the Cloudinary dashboard (Settings -> Access Keys):
     Cloud name, API Key, API Secret
3. Set them as environment variables (never commit these — they're already excluded
   via .gitignore if you use a .env file, but this script also accepts direct input):

     export CLOUDINARY_CLOUD_NAME=your_cloud_name
     export CLOUDINARY_API_KEY=your_api_key
     export CLOUDINARY_API_SECRET=your_api_secret

   (On Windows/PowerShell: use `$env:CLOUDINARY_CLOUD_NAME="..."` instead of `export`)

USAGE
-----
    python3 fetch-cloudinary-manifest.py

UPLOAD FOLDER CONVENTION EXPECTED
----------------------------------
    panchtatva/events/<event-slug>/cover.<ext>
    panchtatva/events/<event-slug>/photo-1.<ext>, photo-2.<ext>, ...
    panchtatva/events/<event-slug>/video-1.<ext>, ...

Any file named "cover" becomes the cover image. Everything else is sorted into
photos or videos based on its resource type (Cloudinary tracks this automatically).
"""

import os
import re
import sys

try:
    import cloudinary
    import cloudinary.api
except ImportError:
    print("The 'cloudinary' package isn't installed. Run:")
    print("  pip install cloudinary --break-system-packages")
    sys.exit(1)

CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME")
API_KEY = os.environ.get("CLOUDINARY_API_KEY")
API_SECRET = os.environ.get("CLOUDINARY_API_SECRET")

if not (CLOUD_NAME and API_KEY and API_SECRET):
    print("Missing Cloudinary credentials. Set these environment variables first:")
    print("  CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET")
    print("(Find them on your Cloudinary dashboard under Settings -> Access Keys)")
    sys.exit(1)

cloudinary.config(cloud_name=CLOUD_NAME, api_key=API_KEY, api_secret=API_SECRET, secure=True)

ROOT_FOLDER = "panchtatva/events"
MANIFEST_PATH = os.path.join(os.path.dirname(__file__), "js", "media-manifest.js")


def fetch_all_resources(resource_type):
    """Paginate through every asset of a given type under the events folder."""
    results = []
    next_cursor = None
    while True:
        kwargs = {
            "type": "upload",
            "resource_type": resource_type,
            "prefix": ROOT_FOLDER + "/",
            "max_results": 500,
        }
        if next_cursor:
            kwargs["next_cursor"] = next_cursor
        resp = cloudinary.api.resources(**kwargs)
        results.extend(resp.get("resources", []))
        next_cursor = resp.get("next_cursor")
        if not next_cursor:
            break
    return results


def build_manifest_data():
    """Returns { slug: {cover, photos[], videos[]} } from what's actually on Cloudinary."""
    images = fetch_all_resources("image")
    videos = fetch_all_resources("video")

    data = {}

    def slug_from_public_id(public_id):
        # panchtatva/events/<slug>/<filename>  ->  <slug>
        parts = public_id.split("/")
        if len(parts) < 3:
            return None
        return parts[2]

    for img in images:
        slug = slug_from_public_id(img["public_id"])
        if not slug:
            continue
        data.setdefault(slug, {"cover": None, "photos": [], "videos": []})
        filename = img["public_id"].split("/")[-1]
        if filename.lower() == "cover" and not data[slug]["cover"]:
            data[slug]["cover"] = img["public_id"]
        else:
            data[slug]["photos"].append(img["public_id"])

    for vid in videos:
        slug = slug_from_public_id(vid["public_id"])
        if not slug:
            continue
        data.setdefault(slug, {"cover": None, "photos": [], "videos": []})
        data[slug]["videos"].append(vid["public_id"])

    # If no file was explicitly named "cover", promote the first photo found
    for slug, media in data.items():
        if not media["cover"] and media["photos"]:
            media["cover"] = media["photos"].pop(0)
        media["photos"].sort()
        media["videos"].sort()

    return data


def update_manifest(data):
    text = open(MANIFEST_PATH, encoding="utf-8").read()
    updated_count = 0

    for slug, media in data.items():
        parts = []
        if media["cover"]:
            parts.append(f'cover: "{media["cover"]}"')
        if media["photos"]:
            photo_list = ",\n      ".join(f'"{p}"' for p in media["photos"])
            parts.append(f'photos: [\n      {photo_list}\n    ]')
        if media["videos"]:
            video_list = ",\n      ".join(f'"{v}"' for v in media["videos"])
            parts.append(f'videos: [\n      {video_list}\n    ]')

        if not parts:
            continue

        entry_body = ",\n    ".join(parts)
        new_entry = f'"{slug}": {{\n    {entry_body}\n  }}'

        pattern = re.compile(r'"' + re.escape(slug) + r'":\s*\{[^}]*\}')
        if pattern.search(text):
            text = pattern.sub(lambda m, r=new_entry: r, text, count=1)
            updated_count += 1
        else:
            print(f"  Note: '{slug}' has no matching event in media-manifest.js — check your Cloudinary folder name matches an event slug exactly.")

    open(MANIFEST_PATH, "w", encoding="utf-8").write(text)
    return updated_count


def main():
    print(f"Fetching assets from Cloudinary (cloud: {CLOUD_NAME})...")
    data = build_manifest_data()

    if not data:
        print(f"No assets found under '{ROOT_FOLDER}/' on Cloudinary. Upload some photos there first (see LAUNCH_GUIDE.md).")
        return

    print(f"Found media for {len(data)} event(s):")
    for slug, media in data.items():
        print(f"  {slug}: cover={'yes' if media['cover'] else 'no'}, {len(media['photos'])} extra photos, {len(media['videos'])} videos")

    updated = update_manifest(data)
    print(f"\nUpdated {updated} entries in js/media-manifest.js")
    print('Also set window.CLOUDINARY_CLOUD_NAME in js/cloudinary.js to:', f'"{CLOUD_NAME}"')
    print("Next: check the site locally, then `git add . && git commit -m \"...\" && git push`.")


if __name__ == "__main__":
    main()

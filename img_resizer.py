import os
from pathlib import Path

from PIL import Image


RESIZED_FOLDER_NAME = 'resized_src'

MIN_WIDTH = 940
MIN_HEIGHT = 800


def resized_dimensions(width, height):
    if height / width >= 1:
        return MIN_WIDTH, int(height * (MIN_WIDTH / width))

    return int(width * (MIN_HEIGHT / height)), MIN_HEIGHT


if __name__ == '__main__':
    os.chdir(Path.cwd() / 'img/src')
    src_folder = Path.cwd()

    resized_src = src_folder / RESIZED_FOLDER_NAME
    if RESIZED_FOLDER_NAME not in os.listdir(src_folder):
        os.mkdir(resized_src)

    img_folders = [
        folder for folder in os.listdir(src_folder)
        if folder[0] != '.' and folder != RESIZED_FOLDER_NAME
    ]

    for img_folder in img_folders:
        if img_folder not in os.listdir(resized_src):
            os.mkdir(resized_img_folder)

        resized_img_folder = resized_src / img_folder

        images = [
            filename for filename in os.listdir(img_folder)
            if filename.split('.')[0] != ''
            and filename.split('.')[-1] != 'mp4'
        ]

        print(f"-- RESIZING IMAGES OF {img_folder} ---")

        for filename in images:
            image = Image.open(src_folder / img_folder / filename)

            width, height = image.size
            resized_image = image.resize(
                resized_dimensions(width, height)
            )

            resized_image.save(resized_img_folder / filename)

            print(resized_image, filename)

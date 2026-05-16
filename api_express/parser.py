import sys
import json
import os
import warnings
import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup

warnings.filterwarnings("ignore", category=UserWarning)

def parse_my_epub(file_path, output_folder):
    try:
        book = epub.read_epub(file_path)
        
        title = book.get_metadata('DC', 'title')[0][0] if book.get_metadata('DC', 'title') else "Titre inconnu"
        author = book.get_metadata('DC', 'creator')[0][0] if book.get_metadata('DC', 'creator') else "Auteur inconnu"
        desc = book.get_metadata('DC', 'description')[0][0] if book.get_metadata('DC', 'description') else ""
        summary = BeautifulSoup(desc, "html.parser").get_text().strip()

        cover_filename = None

        cover_item = None
        
        for item in book.get_items():
            if item.get_type() == ebooklib.ITEM_COVER:
                cover_item = item
                break
        
        if cover_item:
            base_name = os.path.basename(file_path).replace('.epub', '.jpg')
            cover_filename = f"cover-{base_name}"
            save_path = os.path.join(output_folder, cover_filename)
            
            with open(save_path, 'wb') as f:
                f.write(cover_item.get_content())

        result = {
            "title": title,
            "author": author,
            "summary": summary[:1000],
            "cover_image": cover_filename
        }
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    # On attend maintenant 2 arguments : le chemin du fichier et le dossier de sortie
    if len(sys.argv) > 2:
        parse_my_epub(sys.argv[1], sys.argv[2])
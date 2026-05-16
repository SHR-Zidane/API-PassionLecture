import sys
import json
import warnings
from ebooklib import epub
from bs4 import BeautifulSoup

# On ignore les messages d'avertissement inutiles pour ne pas polluer le JSON
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)

def parse_my_epub(file_path):
    try:
        book = epub.read_epub(file_path)
        
        title = book.get_metadata('DC', 'title')[0][0] if book.get_metadata('DC', 'title') else "Titre inconnu"
        author = book.get_metadata('DC', 'creator')[0][0] if book.get_metadata('DC', 'creator') else "Auteur inconnu"
        
        description_raw = book.get_metadata('DC', 'description')[0][0] if book.get_metadata('DC', 'description') else ""
        
        soup = BeautifulSoup(description_raw, "html.parser")
        summary = soup.get_text().strip()

        result = {
            "title": title,
            "author": author,
            "summary": summary[:1000] 
        }
        
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        parse_my_epub(sys.argv[1])
    else:
        print(json.dumps({"error": "Aucun chemin de fichier fourni"}))
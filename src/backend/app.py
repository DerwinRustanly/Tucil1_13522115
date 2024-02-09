import os
import random
import time
from object import Sequence, Game
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

dir = 'static'
os.makedirs(dir, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the POST request contains a file
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']

    # If the user does not select a file, the browser may send an empty file without a filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the uploaded file locally
    print("name: " + file.filename)
    file_name = dir+'/'+file.filename
    file.save(file_name)
    game = txt_reader(file_name)
    start = time.time()
    game.solution()
    end = time.time()
    dur = (end-start)*1000
    response = {
        'sequences' : [[[game.sequence[i].string[j:j+2] for j in range(0,len(game.sequence[i].string),2)], game.sequence[i].val] for i in range(len(game.sequence))] ,
        'width': game.width,
        'height': game.height,
        'matrix' : game.matrix,
        'maxbuffer' : [game.max.string[i:i+2] for i in range(0,len(game.max.string),2)],
        'maxvalue' : game.max.val,
        'maxcoordinate' : [(game.maxcoordinate[i].y, game.maxcoordinate[i].x) for i in range(game.maxlen//2)],
        'duration' : dur
    }   
    return jsonify(response), 200

@app.route('/save', methods=['POST'])
def save_file():
    data = request.get_json()
    file = data.get('filename')
    reward = data.get('reward')
    buffer = data.get('buffer')
    coordinates = data.get('coordinates')
    duration = data.get('duration')
    if file == "" or reward == None or buffer == [] or coordinates == []:
        return jsonify({'error': 'Missing filename, reward, buffer, or coordinates'}), 400
    file = "../../test/output/"+file
    with open(file, 'w') as savefile:
        savefile.write(str(reward)+"\n")
        for token in buffer:
            savefile.write(token)
            savefile.write(" ")
        savefile.write("\n")
        for coordinate in coordinates:
            savefile.write("("+str(coordinate[1]+1)+","+str(coordinate[0]+1)+")")
        savefile.write("\n")
        savefile.write(str(duration) + "ms")

    print(reward)
    print(buffer)
    print(coordinates)
    print(duration)
    return jsonify({'message': 'File saved successfully'}), 200

def txt_reader(path):
    with open(path, "r") as file:
        size = int(file.readline())
        width, height = map(int, file.readline().split(" "))
        mat = [[0 for i in range(width)] for j in range(height)]
        for i in range(height):
            for j in range(width):
                mat[i][j] = file.read(2)
                file.read(1)
        n = int(file.readline())
        seq = ["" for i in range(n)]
        for i in range(n):
            s = "".join(file.readline().strip().split(" "))
            val = int(file.readline())
            seq[i] = Sequence(s, val)
    return Game(size,width,height,mat,n,seq)

def stdin():
    numToken = int(input("Masukkan jumlah token unik: "))
    while numToken <= 0:
        print("Jumlah token unik setidaknya 1")
        numToken = int(input("Masukkan jumlah token unik: "))
    listToken = input("Masukkan token: ").split()
    while len(listToken) != numToken:
        print("Harap masukkan token dengan jumlah yang sesuai")
        listToken = input("Masukkan token: ").split()
    size = int(input("Masukkan ukuran buffer: "))
    while size <= 0:
        print("Ukuran buffer setidaknya 1")
        size = int(input("Masukkan ukuran buffer: "))
    width,height = map(int,input("Masukkan ukuran matriks dalam format m n: ").split())
    mat = [[listToken[random.randint(0,numToken-1)] for j in range(width)] for i in range(height)]
    num = int(input("Masukkan jumlah sekuens: "))
    sequence = [Sequence("",0) for i in range(num)]
    seqSize = int(input("Masukkan ukuran maksimal sekuens: "))
    for i in range(num):
        for j in range(random.randint(2,seqSize)):
            sequence[i].string += listToken[random.randint(0,numToken-1)]
        sequence[i].val = random.randrange(10,40,5)
    return Game(size,width,height,mat,num,sequence)

def txt_writer(path, game: Game):
    with open(path, "w") as file:
        file.write(str(game.max.val)+"\n")
        for i in range(len(game.max.string)):
            file.write(game.max.string[i])
            if i%2 != 0:
                file.write(" ")
        file.write("\n")
        for i in range(game.size):
            file.write(f"{i+1}. ({game.maxcoordinate[i].x+1},{game.maxcoordinate[i].y+1})\n")
        file.write("\n")
        file.write(f"{(end-start)*1000:.2f} ms")

if __name__ == "__main__":
    path = "../../test/input/file.txt"
    game = txt_reader(path)
    # game = stdin()
    game.infoGame()
    start = time.time()
    game.solution()
    end = time.time()
    print(f"{(end-start)*1000:.2f} ms")
    isPrintable = input("Apakah ingin menyimpan solusi?(y/n) ")
    if (isPrintable == "Y" or isPrintable == "y"):
        output = input("Masukkan nama file output: ")
        txt_writer("../../test/output/"+output, game)

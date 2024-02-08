import os
import random
import time
from object import Sequence, Game

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
    path = "file.txt"
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
        txt_writer(output, game)

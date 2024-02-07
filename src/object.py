class Coordinate:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def isCoincident(P1, P2):
        return P1.x == P2.x and P1.y == P2.y

    def isMember(P1, L):
        found = False; i = 0
        while(not(found) and i < len(L)):
            if Coordinate.isCoincident(L[i], P1):
                found = True
            i += 1
        return found

class Sequence:
    def __init__(self, string, val):
        self.string = string
        self.val = val
    
    def join(self, token):
        self.string += token
    
    def countSubstring(self, substring):
        count = 0; i = 0
        while(i <= len(self.string) - len(substring)):
            check = True; j = 0
            while check and j < len(substring):
                if self.string[i] == substring[j]:
                    j += 1; i += 1
                else:
                    check = False
            if check:
                count += 1
            else:
                i += 1
        return count
    
    def getPoint(self, list, num):
        point = 0
        for i in range(num):
            point += self.countSubstring(list[i].string) * list[i].val
        return point
    
class Game:
    def __init__(self, size, width, height, matrix, num, sequence):
        self.size = size
        self.width = width
        self.height = height
        self.matrix = matrix
        self.num = num
        self.sequence = sequence
        self.current = Sequence("",0)
        self.max = Sequence("",0)
        self.coordinate = [Coordinate(-99,-99) for i in range(self.size)]
        self.maxcoordinate = [Coordinate(-99,-99) for i in range(self.size)]
    
    def infoGame(self):
        print(self.size)
        print(self.width,self.height)
        for i in range(self.height):
            for j in range(self.width):
                print(self.matrix[i][j], end = " ")
            print()
        print(self.num)
        for i in range(self.num):
            print("(",end="")
            for j in range(len(self.sequence[i].string)):
                if j%2 == 0 and j > 0 :
                    print(" ",end="")
                print(self.sequence[i].string[j], end="")
            print(f",{self.sequence[i].val})")  


    def search(self, isVertical, idx, pivot, buffer):
        if idx == self.size: 
            self.current.string = "".join(buffer)
            self.current.val = self.current.getPoint(self.sequence, self.num)
            # print(self.current.string)

            if self.current.val > self.max.val:
                self.max.string = self.current.string
                self.max.val = self.current.val
                for i in range(self.size):
                    self.maxcoordinate[i] = self.coordinate[i]
                # if self.max.val > 0 : print(self.max.val)
            return None

        if isVertical:
            for i in range(self.height):
                currentCoordinate = Coordinate(pivot, i)
                if not(Coordinate.isMember(currentCoordinate, self.coordinate)):
                    buffer[idx] = self.matrix[i][pivot]
                    self.coordinate[idx] = currentCoordinate
                    self.search(not(isVertical),idx+1, i, buffer)
        else:
            for j in range(self.width):
                currentCoordinate = Coordinate(j,pivot)
                if not(Coordinate.isMember(currentCoordinate, self.coordinate)):
                    buffer[idx] = self.matrix[pivot][j]
                    self.coordinate[idx] = currentCoordinate
                    self.search(not(isVertical),idx+1, j, buffer)
    
    def solution(self):
        buffer = ["" for i in range(self.size)]
        for j in range(self.width):
            isVertical = True
            buffer[0] = self.matrix[0][j] 
            self.coordinate[0] = Coordinate(j,0)
            self.search(isVertical, 1,j, buffer)
        print(self.max.val)
        for i in range(len(self.max.string)):
            print(self.max.string[i],end = "")
            if i%2 != 0:
                print(" ",end="")
        print()
        for i in range(self.size):
            print(f"{i+1}. ({self.maxcoordinate[i].x+1},{self.maxcoordinate[i].y+1})")
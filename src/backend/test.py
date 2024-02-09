string = "abcdefgh"
split_strings = [string[i:i+2] for i in range(0, len(string), 2)]
print(split_strings)
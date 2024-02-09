import tkinter as tk

def on_click(i, j):
    print("Clicked on element at row", i, "and column", j)

def display_matrix(matrix):
    rows = len(matrix)
    cols = len(matrix[0])
    
    root = tk.Tk()
    root.title("Matrix Display")

    for i in range(rows):
        for j in range(cols):
            label = tk.Label(root, text=matrix[i][j], padx=10, pady=5, borderwidth=1, relief="solid")
            label.grid(row=i, column=j, padx=10, pady=10)

            # Make element at row 0 and column 2 clickable
            if i == 0 and j == 2:
                # label.bind("<Button-1>", lambda event, i=i, j=j: on_click(i, j))
                label.config(bg="lightblue")

    root.mainloop()

# Example matrix
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Display the matrix
display_matrix(matrix)

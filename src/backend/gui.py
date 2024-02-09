import customtkinter
from customtkinter import filedialog
import object
from app import *

primaryColor = "#D0ED57"
primaryFont = "Cascadia Code"

customtkinter.set_default_color_theme("dark-blue")
def button_callback():
    print("button pressed")

def handleFile(): 
    global game, app
    file_path = filedialog.askopenfilename()
    game = txt_reader(file_path)
    app.startFrame.update_content(game)
    app.startFrame.tkraise()

class App(customtkinter.CTk):
    def __init__(self):
        super().__init__()
        self.title("CYBERPUNK 2077 BREACH PROTOCOL")
        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()

        self.geometry(f"{screen_width}x{screen_height}+0+0")
        self.resizable(False, False)
        self.grid_columnconfigure(0,weight=1)
        self.grid_rowconfigure(0,weight=1)
        self.mainFrame = MainFrame(self,fg_color="black")
        self.mainFrame.grid(row=0,column=0, sticky="nsew")
        self.menuFrame = MenuFrame(self,fg_color="black")
        self.menuFrame.grid(row=0,column=0, sticky="nsew")
        self.fileFrame = fileFrame(self,fg_color="black")
        self.fileFrame.grid(row=0,column=0, sticky="nsew")
        self.startFrame = StartFrame(self,fg_color="black")
        self.startFrame.grid(row=0,column=0, sticky="nsew")
        self.fileFrame.tkraise()
        

class MainFrame(customtkinter.CTkFrame):
    def __init__(self, master, **kwargs):
        super().__init__(master, **kwargs)
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(0,weight=1)
        self.wrapper = customtkinter.CTkFrame(self, fg_color="transparent")
        self.wrapper.grid(row=0,column=0)
        self.label = customtkinter.CTkLabel(self.wrapper, text="Welcome to Cyberpunk 2077\nBreach Protocol Solver", text_color=primaryColor, font=(primaryFont, 42))
        self.label.grid(row=0,column=0)
        self.button = customtkinter.CTkButton(self.wrapper, text="Start Now", text_color=primaryColor, font=(primaryFont, 28), fg_color="black", hover_color="gray11", border_color=primaryColor, border_width=2,command=lambda : master.menuFrame.tkraise())
        self.button.grid(row=1, column=0, ipadx=20, ipady=20, pady=40, padx=20)

class MenuFrame(customtkinter.CTkFrame):
    def __init__(self, master, **kwargs):
        super().__init__(master, **kwargs)
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(0,weight=1)
        self.wrapper = customtkinter.CTkFrame(self, fg_color="transparent")
        self.wrapper.grid(row=0,column=0)
        self.wrapper.grid_columnconfigure((0,1),weight=1)
        self.label = customtkinter.CTkLabel(self.wrapper, text="Choose Your Starting Option", text_color=primaryColor, font=(primaryFont, 42))
        self.label.grid(row=0,column=0, columnspan=2)
        self.button = customtkinter.CTkButton(self.wrapper, text="Upload Txt File", text_color=primaryColor, font=(primaryFont, 28), fg_color="black", hover_color="gray11", border_color=primaryColor, border_width=2,command=lambda : master.fileFrame.tkraise())
        self.button.grid(row=1, column=0, ipadx=20, ipady=20, pady=40, padx=20)
        self.button = customtkinter.CTkButton(self.wrapper, text="Input Manually", text_color=primaryColor, font=(primaryFont, 28), fg_color="black", hover_color="gray11", border_color=primaryColor, border_width=2,command=button_callback)
        self.button.grid(row=1, column=1, ipadx=20, ipady=20, pady=40, padx=20)

class fileFrame(customtkinter.CTkFrame):
    def __init__(self, master, **kwargs):
        super().__init__(master, **kwargs)
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(0,weight=1)
        self.wrapper = customtkinter.CTkFrame(self, fg_color="transparent", border_color=primaryColor, border_width=1)
        self.wrapper.grid(row=0,column=0,sticky="nsew")
        self.wrapper.grid_columnconfigure(0, weight=1)
        self.wrapper.grid_columnconfigure(1, weight=1)
        self.wrapper.grid_rowconfigure(0, weight=2)
        self.wrapper.grid_rowconfigure(1, weight=1)
        self.label = customtkinter.CTkLabel(self.wrapper, text="Please Upload a .txt File\nwith the following format:",font=(primaryFont, 36), text_color=primaryColor)
        self.label.grid(row=0,column=0)
        self.format = customtkinter.CTkFrame(self.wrapper, border_width=1 ,border_color=primaryColor)
        self.format.grid(row=0,column=1,sticky="nsew")
        self.format.grid_columnconfigure(0, weight=1)
        self.format.grid_rowconfigure(0, weight=1)
        self.formatLabel = customtkinter.CTkLabel(self.format,
                                                  text="buffer_size\nmatrix_width matrix_height\nmatrix\nnumber_of_sequences\nsequences_1\nsequences_1_reward\nsequences_2\nsequences_2_reward\n…\nsequences_n\nsequences_n_reward",
                                                  justify= "left",
                                                  text_color=primaryColor,
                                                  font=(primaryFont, 24))
        self.formatLabel.grid(row=0,column=0,ipadx=20, ipady=20)
        self.button = customtkinter.CTkButton(self.wrapper, text="Upload Txt File", text_color=primaryColor, font=(primaryFont, 28), fg_color="black", hover_color="gray11", border_color=primaryColor, border_width=2,command=handleFile)
        self.button.grid(row=1, column=0, ipadx=20, ipady=20, pady=40, padx=20, columnspan=2)


class StartFrame(customtkinter.CTkFrame):
    def __init__(self, master, **kwargs):
        super().__init__(master, **kwargs)
        self.rows = None
        self.cols = None

    def update_content(self, game):
        self.rows = game.height
        self.cols = game.width
        for i in range(self.rows):
            for j in range(self.cols):
                label = customtkinter.CTkButton(self, text=game.matrix[i][j], border_width=1, border_color=primaryColor)
                label.grid(row=i, column=j, padx=10, pady=10)


app = App()
app.mainloop()
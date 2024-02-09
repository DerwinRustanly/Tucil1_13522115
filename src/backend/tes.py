import customtkinter

class MyCheckboxFrame(customtkinter.CTkFrame):
    def __init__(self, master,**kwargs):
        super().__init__(master,**kwargs)

        self.checkbox_1 = customtkinter.CTkCheckBox(self, text="checkbox 1")
        self.checkbox_1.grid(row=0, column=0, padx=10, pady=(10, 0), sticky="w")
        self.checkbox_2 = customtkinter.CTkCheckBox(self, text="checkbox 2")
        self.checkbox_2.grid(row=1, column=0, padx=10, pady=(10, 0), sticky="w")

class App(customtkinter.CTk):
    def __init__(self):
        super().__init__()

        self.title("my app")
        self.geometry("400x180")
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(0, weight=1)

        self.checkbox_frame = MyCheckboxFrame(self, fg_color="transparent", border_width=1, border_color="red")
        self.checkbox_frame.grid(row=0, column=0, padx=10, pady=(10, 0), sticky="nsw")

        self.testframe = customtkinter.CTkFrame(self.checkbox_frame, border_width=1, border_color="yellow")
        self.testframe.grid(row=0,column=0)
        self.label = customtkinter.CTkLabel(self.testframe,text_color="blue")
        self.label.grid(row=0,column=0)
        self.button = customtkinter.CTkButton(self, text="my button", command=self.button_callback)
        self.button.grid(row=3, column=0, padx=10, pady=10, sticky="ew")

    def button_callback(self):
        print("button pressed")

app = App()
app.mainloop()
import os
import win32com.client

def html_to_msg(subject, html_content, save_path):
    outlook = win32com.client.Dispatch("Outlook.Application")
    message = outlook.CreateItem(0)  # 0 - olMailItem
    
    message.Subject = subject
    message.HTMLBody = html_content
    
    message.SaveAs(save_path)
    print(f"Saved .msg file to {save_path}")

if name == "main":
    with open("C:\\Users\\o.riabenko\\Desktop\\Нові призначення\\Вересень\\Ч2\\src\\index.html", 'r', encoding='utf-8') as f:
        html_content = f.read()

    save_path = "C:\\Users\\o.riabenko\\Desktop\\Нові призначення\\Вересень\\Ч2\\output_message.msg"

    html_to_msg("Test Subject", html_content, save_path)
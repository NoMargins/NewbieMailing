import win32com.client

def create_msg(subject, body_html, output_file):
    outlook = win32com.client.Dispatch("Outlook.Application")
    message = outlook.CreateItem(0)  # 0 - olMailItem
    message.Subject = subject
    message.HTMLBody = body_html
    
    message.SaveAs(output_file)

# Завантаження HTML-змісту з файлу
html_file_path = r"C:\Users\Admin\OneDrive\Desktop\NewAppointments\build\index.html"
with open(html_file_path, 'r', encoding='utf-8') as file:
    html_content = file.read()

# Створення .msg файлу
create_msg("Test Subject", html_content, "test_email.msg")

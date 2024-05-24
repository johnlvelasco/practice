import pandas as pd
import mysql.connector

df = pd.read_csv('executes.csv')
db = mysql.connector.connect(
    host='191.101.79.103', 
    user='u395675147_admin', 
    password='1!Banana!2', 
    database='u395675147_cs2executes'
)
cursor = db.cursor()
cursor.execute("select * from executes")
data = cursor.fetchall()    
print(df['Throw'].value_counts())

def get_throw_icon(throw): 
    throw = throw.replace("+", "")
    throw = throw.replace(" ", "")
    path = f'./icons/{throw.lower()}_throw.png'
    # parse throw by removing all whitespace & symbols
    # return path of icon
    return path

def write_table_html(): 
    html = "<section>"
    for i in data:
        html += f"""
            <details> 
                <summary>
                    <div class="executeRow">
                        <span>
                            <img class="icons", id="preview-grenade" src="./icons/{i[1]}.png">
                        </span>
                        <span>
                            <img class="icons", id="preview-map" src="./icons/{i[3]}.png">
                        </span>
                        <h3>
                            <strong id="preview-description">{i[0]}</strong>
                            <small id="preview-throw">{i[2]}</small>
                            <small id="preview-position">{i[5]}</small>
                        </h3>
                        <span>
                            <img class="icons", id="preview-team" src="./icons/{i[4]}.png">
                        </span>
                    </div>
                </summary>
                <div>
                    <dl>
                        <span>
                            <img class="key", src="{get_throw_icon(i[2])}">
                        </span>
                    </dl>
                </div>
                <td>{i[0]}</td>
                <td>{i[1]}</td>  
                <td>{i[2]}</td>  
                <td>{i[3]}</td>  
                <td>{i[4]}</td>  
                <td>{i[5]}</td>  
            </details>    
        """ 
    html += "</section>" 
    f = open("test.html", "w")
    f.write(html)
    f.close()
#write_table_html()

# Identify media files and set them to variables
def upload(): 
    import os
    import tkinter as tk
    from tkinter import filedialog
    root = tk.Tk()
    root.withdraw()
    paths = filedialog.askopenfilenames()

    dest = 'C:/Users/johnv/repos/practice/media'
    import shutil
    import os
    _, _, files = next(os.walk(dest))
    count = len(files)
    for i in paths:  
        dest = f'C:/Users/johnv/repos/practice/media/file_{count}'
        shutil.copy(i, dest)
        count+=1 

# def write_admin_table(): 
#     html =  """
#         <table> 
#             <tr> 
#                 <th>Description</th>
#                 <th>Grenade</th>
#                 <th>Throw</th>
#                 <th>Map</th>
#                 <th>Team</th>
#                 <th>Position</th>
#                 <th>Edit</th>
#             </tr> 
#     """

#     for i in data:
#         html += f"""
#             <tr> 
#                 <td>{i[0]}</td>
#                 <td>{i[1]}</td>  
#                 <td>{i[2]}</td>  
#                 <td>{i[3]}</td>  
#                 <td>{i[4]}</td>  
#                 <td>{i[5]}</td> 
#                 <td> 
#                     <button class="search" onclick="onEdit('{i[0]}', '{i[1]}', '{i[2]}', '{i[3]}', '{i[4]}', '{i[5]}')">Edit</button> 
#                 </td>
#             </tr>    
#         """ 
#     html += "</table>" 
#     f = open("test.html", "w")
#     f.write(html)
#     f.close()

write_table_html()

#write_admin_table()







def create_table(): 
    cursor.execute("create table executes (description varchar(100), grenade varchar(5), throw varchar(20), team varchar(2), position varchar(100))")

def load_data(): 
    cmd = """
        load data infile 'executes.csv'
        into table executes
        fields terminated by ','
        enclosed by '"' lines terminated by '\n'
        ignore 1 rows;
    """
    cursor.execute(cmd)
    for i in cursor: 
        print(i)


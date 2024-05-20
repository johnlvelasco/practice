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

#cursor.execute('show databases')
#create table executes (description varchar(100), grenade varchar(5), throw varchar(20), team varchar(2), position varchar(100)) 

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


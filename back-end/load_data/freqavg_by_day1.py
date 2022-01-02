import sqlite3
import pandas as pd
import numpy as np

df= pd.read_csv('시간지역별배달주문건수_요일포함.csv')
df_mapping = pd.DataFrame({
    '요일': ['월', '화', '수', '목', '금', '토','일']
})
sort_mapping = df_mapping.reset_index().set_index('요일')
print(sort_mapping)
df['요일정렬'] = df['요일'].map(sort_mapping['index'])

conn = sqlite3.connect("NaplessRabbit.db")
cursor = conn.cursor()

# cursor.execute('''CREATE TABLE freqavg_by_day1(
#                id INTEGER PRIMARY KEY AUTOINCREMENT, 
#                area1 VARCHAR(45) NOT NULL, 
#                day VARCHAR(1) NOT NULL, 
#                freqavg INT NOT NULL) ''')

# cursor.execute(""" SELECT name FROM sqlite_master WHERE type='table' """ )

level1_list = list(df['광역시도'].unique())
# level2_list = list(df[df['광역시도']==Si_Do]['시군구'].unique() for Si_Do in level1_list)
print(level1_list)
for Si_Do in level1_list:   
  df_dayFreq = df[(df['광역시도'] == Si_Do)].groupby('요일').mean().reset_index().sort_values(by='요일정렬')
  for row in df_dayFreq.itertuples():
    cursor.execute('''INSERT INTO freqavg_by_day1 (area1,day,freqavg) VALUES(?, ?, ?)''', 
    [Si_Do, row.요일, int(round(row.배달건수))])
#Committing the changes
conn.commit()

#closing the database connection
conn.close()
from statsbombpy import sb
import pandas as pd
import matplotlib.pyplot as plt
from mplsoccer import VerticalPitch, Pitch

pd.set_option('display.max_rows', None)  # Desactiva el límite de filas
pd.set_option('display.max_columns', None)  # Desactiva el límite de columnas
pd.set_option('display.width', None)  # Evita el salto de línea
pd.set_option('display.max_colwidth', None)  # Muestra contenido completo de celdas

competitions_data = sb.competitions()

with open('competencias.txt', 'w', encoding='utf-8') as file:
    file.write(str(competitions_data))
competitions_matches = sb.matches(competition_id=81, season_id=48)

with open('partidos.txt', 'w', encoding='utf-8') as file:
    file.write(str(competitions_matches))
from iqoptionapi.stable_api import IQ_Option
import time
from time import localtime
from datetime import datetime
import sys
from colorama import init, Fore, Back

def carregar_sinais():
    arquivo = open('sinais.txt', encoding='UTF-8')
    lista = arquivo.read()
    arquivo.close

    lista = lista.split('\n')

    for index, a in enumerate(lista):
        if a == '':
            del lista[index]

    return lista

def arquivo():
    
    lista = carregar_sinais()

    hora_moeda = []
    for sinal in lista:
        dados = sinal.split(',')

        hora_moeda.append(dados[0]+","+dados[1]+","+dados[2])
        
    
    return hora_moeda 


init(autoreset=True)
API = IQ_Option('login', 'senha')
API.connect()

API.change_balance('PRACTICE') # PRACTICE / REAL

if API.check_connect():
	print('\n\nConectado com sucesso')
else:
	print('\n Erro ao se conectar')
	sys.exit()
	
hora_moeda = arquivo()
for x in hora_moeda:
    split = x.split(',')
    hora = split[0]
    moeda = split[1]
    par = split[2]
    velas = API.get_candles(moeda, (int(1) * 60), 100,  time.time())
    ultimo = round(velas[0]['close'], 4)
    primeiro = round(velas[-1]['close'], 4)
    diferenca = abs( round( ( (ultimo - primeiro) / primeiro ) * 20, 3) )
    tendencia = "CALL" if ultimo < primeiro and diferenca > 0.01 else "PUT" if ultimo > primeiro and diferenca > 0.01 else False
    print(tendencia)
    lcltime = datetime.now().strftime('%H:%M')
    while(hora != lcltime):
        lcltime = datetime.now().strftime('%H:%M')
    else:
        timeframe = 1
        Money=10
        ACTIVES=moeda
        ACTION=par
        expirations_mode=timeframe
        if tendencia == par:
            status,id=API.buy(Money,ACTIVES,tendencia,expirations_mode)
            if status:
                print("operação PAR realizada: ")
                status,valor = API.check_win_v4(id)
                if status:
                    lucro += round(valor, 2)
                    print('Resultado operação: ', end='')
                    i = 0
                    print('WIN /' if valor > 0 else 'LOSS /' , round(valor, 2) ,'/', round(lucro, 2),('/ '+str(i)+ ' GALE' if i > 0 else '' ))
                else:
                    print("ERRO")
        else:
            status,id=API.buy(Money,ACTIVES,ACTION,expirations_mode)
            if status:
                
                print("operação Tendencia realizada, Boa Sorte: ")
                status,valor = API.check_win_v4(id)
                if status:
                    lucro = round(valor, 2)
                    print('Resultado operação: ', end='')
                    i = 0
                    print('WIN /' if valor > 0 else 'LOSS /' , round(valor, 2) ,'/', round(lucro, 2),('/ '+str(i)+ ' GALE' if i > 0 else '' ))
                else: 
                    print("ERRO")
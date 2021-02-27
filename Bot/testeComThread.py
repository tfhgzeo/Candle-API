from iqoptionapi.stable_api import IQ_Option
from time import localtime
from datetime import datetime
from colorama import init, Fore, Back
import time
import sys
import threading

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

def verificarWin(id):
    print('Thread')
    valor = API.check_win_v4(id)
    print('Thread')
    print(valor)


init(autoreset=True)
API = IQ_Option('login', 'senha')
API.connect()

API.change_balance('PRACTICE') # PRACTICE / REAL

if API.check_connect():
	print(' Conectado com sucesso!')
else:
	print(' Erro ao conectar')
	input('\n\n Aperte enter para sair')
	sys.exit()


hora_moeda = arquivo()
for x in hora_moeda:
    split = x.split(',')
    hora = split[0]
    moeda = split[1]
    par = split[2]
    
    lcltime = datetime.now().strftime('%H:%M')
    while(hora != lcltime):
        lcltime = datetime.now().strftime('%H:%M')
    else:
        
        Money=10
        ACTIVES=moeda
        ACTION=par
        expirations_mode=1
        status,id=API.buy(Money,ACTIVES,ACTION,expirations_mode)
        print(id)
        print("operação realizada, Boa Sorte: ")
        time.sleep(1)
        threading.Thread(target=verificarWin, args=(id,)).start()

        

        


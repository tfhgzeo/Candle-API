from iqoptionapi.stable_api import IQ_Option
from colorama import Fore, init
from datetime import datetime
import sys

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
 
arquivos = input(" nome arquivo: ")
arquivos = open(arquivos, 'r').read()
arquivos = arquivos.split('\n')

print('\n\n')

timeframe = 1
win = 0
loss = 0

for dados in sorted(arquivos):
    if dados.strip() != '':
        dados = dados.split(',')
        horario = datetime.strptime(dados[0] + ':00', '%Y-%m-%d %H:%M:%S')
        horario = datetime.timestamp(horario)
        
        velas = API.get_candles(dados[1].upper(),(timeframe * 60),1 ,int(horario) )
        if int(velas[0]['from']) == int(horario):
            
            dir ='CALL' if velas[0]['open'] < velas[0]['close'] else 'PUT' if  velas[0]['open'] > velas[0]['close'] else 'doji'
            if dir == dados[2].upper():
                print(dados[0], dados[1],dados[2],'|',Fore.GREEN + 'WIN')
                win += 1
            else:
                print(dados[0], dados[1],dados[2],'|',Fore.RED + 'LOSS')
                loss += 1
            
        else:
            print(dados[0], dados[1],dados[2],'|',Fore.RED + 'não foi possivel capturar')

print(50 * '-')

print('[Resultado]')
print('WIN' + Fore.GREEN + str(win))
print('LOSS' + Fore.RED + str(loss))
print('WINRATE: ' + str(round((win / (win+loss)) * 100)))    













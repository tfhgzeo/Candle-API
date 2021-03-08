from iqoptionapi.stable_api import IQ_Option
import sys

def iniciaBot(senha):
    API = IQ_Option('Gustavoacm06@gmail.com', senha)
    API.connect()

    if API.check_connect():
        print("conectado")
    else:
        print("erro")
        

iniciaBot(sys.argv[1])
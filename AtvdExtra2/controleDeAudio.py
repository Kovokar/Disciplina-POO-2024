class ControleDeAudio: 
    def __init__(self, volume=5): 
        self.volume = volume
        
    def aumentarVolume(self): 
        if self.volume < 10:
            self.volume += 1
            
    def diminuirVolume(self): 
        if self.volume > 0:
            self.volume -= 1
            
    def lerVolume(self):
        return self.volume
        
controle = ControleDeAudio() 

for i in range(10):
    controle.diminuirVolume()

print(controle.lerVolume())

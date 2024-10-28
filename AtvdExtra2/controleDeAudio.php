<?php
    class ControleDeAudio{
        public $volume = 5;
        
        public function aumentarVolume(){
            return $this->volume < 10 ? ++$this->volume : $this->volume;
        }
        public function diminuirVolume(){
            return $this->volume > 0 ? --$this->volume : $this->volume;
        }
        public function lerVolume(){
            return $this->volume;
        }
    }
    
    $meuControle = new ControleDeAudio();
    
    for ($i = 1; $i <= 10; $i++) {
        $meuControle->diminuirVolume();
    }
    
    echo $meuControle->lerVolume();
?>
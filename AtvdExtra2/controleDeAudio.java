//ControleDeAudio.java


public class ControleDeAudio {
    private int volume = 5; 

    public int aumentarVolume() {
        return this.volume < 10 ? this.volume++ : this.volume;
    }

    public int diminuirVolume() {
        return this.volume > 0 ? this.volume-- : this.volume;
    }

    public int lerVolume() {
        return volume;
    }

    public static void main(String[] args) {
        ControleDeAudio controle = new ControleDeAudio();

        for (int i = 1; i < 10; i++) {
            controle.aumentarVolume();
        }

        System.out.println(controle.lerVolume()); 
    }
}
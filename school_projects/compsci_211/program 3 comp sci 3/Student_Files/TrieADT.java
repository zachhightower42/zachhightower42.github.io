import java.io.FileNotFoundException;
import java.util.ArrayList;

public interface TrieADT {
    public void createDictionary() throws FileNotFoundException;
    public void build();
    public ArrayList<String> words();
    public ArrayList<String> words(TrieNode node, String prefix, ArrayList<String> output);
    public ArrayList<String> prefixWords(String prefix);
    public ArrayList<String> prefixWords(TrieNode node, String prefix, String suffix, ArrayList<String> output);
    }

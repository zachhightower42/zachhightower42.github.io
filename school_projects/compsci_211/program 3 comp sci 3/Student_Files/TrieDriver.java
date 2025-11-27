import java.io.FileNotFoundException;
import java.util.ArrayList;

public class TrieDriver {
    public static void main(String[] args) throws FileNotFoundException {
        Trie t1 = new Trie("sixWords.txt");
        //Trie t1 = new Trie("oneSentence.txt");
        //Trie t1 = new Trie("aWords.txt");

        //Create dictionary and build tree
        t1.createDictionary();
        t1.build();

        //Verify I can print a subset of the dictionary and the entire trie (toString)
//        System.out.println(t1.printDictionary(0, 6));
//        System.out.println("In DRIVER:\n"+t1);

        //Identify the words in the trie - output the returned ArrayList of words
        ArrayList<String> words = t1.words();
        System.out.println("LIST OF WORDS");
//        for(String oneWord: words)
//            System.out.println(oneWord);


        //Now, find all the words with a certain prefix.
        words = t1.prefixWords("ma");
        System.out.println("Words with ma");
        for(String oneWord: words)
            System.out.println(oneWord);

    }
}

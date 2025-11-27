import org.junit.jupiter.api.Test;

import java.io.FileNotFoundException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class TrieTest_Student {
    @Test
    void testCreateDictionary1() throws FileNotFoundException {
        Trie evaluator = new Trie("sixWords.txt");
        evaluator.createDictionary();
        assertEquals("home\n" +
                "house\n" +
                "main\n" +
                "movie\n" +
                "homework\n" +
                "maintenance\n", evaluator.printDictionary(0, 6));
    }

    @Test
    void testCreateDictionary2() throws FileNotFoundException {
        Trie evaluator = new Trie("oneSentence.txt");
        evaluator.createDictionary();
        assertEquals("the\n" +
                "quick\n" +
                "red\n" +
                "fox\n" +
                "jumps\n" +
                "over\n" +
                "the\n" +
                "lazy\n" +
                "brown\n" +
                "dog\n", evaluator.printDictionary(0, 10));
    }


    @Test
    void testBuild1() throws FileNotFoundException {
        Trie evaluator = new Trie("sixWords.txt");
        evaluator.createDictionary();
        evaluator.build();
        assertEquals("h o m e w o r k u s e m a i n t e n a n c e o v i e ", evaluator.toString());
    }

    @Test
    void testBuild2() throws FileNotFoundException {
        Trie evaluator = new Trie("oneSentence.txt");
        evaluator.createDictionary();
        evaluator.build();
        assertEquals("t h e q u i c k r e d f o x j u m p s o v e r l a z y b r o w n d o g ", evaluator.toString());
    }

    @Test
    void testWords1() throws FileNotFoundException {
        Trie evaluator = new Trie("sixWords.txt");
        evaluator.createDictionary();
        evaluator.build();
        ArrayList<String> words = evaluator.words();
        String temp = "";
        for(String oneWord: words)
            temp += oneWord+"\n";

        assertEquals("home\n" +
                "homework\n" +
                "house\n" +
                "main\n" +
                "maintenance\n" +
                "movie\n", temp);
    }

    @Test
    void testWords2() throws FileNotFoundException {
        Trie evaluator = new Trie("oneSentence.txt");
        evaluator.createDictionary();
        evaluator.build();
        ArrayList<String> words = evaluator.words();
        String temp = "";
        for(String oneWord: words)
            temp += oneWord+"\n";

        assertEquals("the\n" +
                "quick\n" +
                "red\n" +
                "fox\n" +
                "jumps\n" +
                "over\n" +
                "lazy\n" +
                "brown\n" +
                "dog\n", temp);
    }

    @Test
    void testWords4() throws FileNotFoundException {
        Trie evaluator = new Trie("aWords.txt");
        evaluator.createDictionary();
        evaluator.build();
        ArrayList<String> words = evaluator.words();
        String temp = "";
        for(int i = 5; i < 12; i++)
            temp += words.get(i) + "\n";

        assertEquals("abroad\n" +
                "absence\n" +
                "absolute\n" +
                "abuse\n" +
                "academic\n" +
                "accept\n" +
                "access\n", temp);
    }

    @Test
    void testPrefixWords1() throws FileNotFoundException {
        Trie evaluator = new Trie("sixWords.txt");
        evaluator.createDictionary();
        evaluator.build();
        ArrayList<String> words = evaluator.prefixWords("h");
        String temp = "";
        for(String oneWord: words)
            temp += oneWord+"\n";

        assertEquals("home\n" +
                "homework\n" +
                "house\n" , temp);
    }

    @Test
    void testPrefixWords4() throws FileNotFoundException {
        Trie evaluator = new Trie("oneSentence.txt");
        evaluator.createDictionary();
        evaluator.build();
        ArrayList<String> words = evaluator.prefixWords("");
        String temp = "";
        for(String oneWord: words)
            temp += oneWord+"\n";

        assertEquals("the\n" +
                "quick\n" +
                "red\n" +
                "fox\n" +
                "jumps\n" +
                "over\n" +
                "lazy\n" +
                "brown\n" +
                "dog\n", temp);
    }

    @Test
    void testPrefixWords5() throws FileNotFoundException {
        Trie evaluator = new Trie("oneSentence.txt");
        evaluator.createDictionary();
        evaluator.build();
        ArrayList<String> words = evaluator.prefixWords("t");
        String temp = "";
        for(String oneWord: words)
            temp += oneWord+"\n";

        assertEquals("the\n", temp);
    }

    @Test
    void testPrefixWords8() throws FileNotFoundException {
        Trie evaluator = new Trie("aWords.txt");
        evaluator.createDictionary();
        evaluator.build();
        ArrayList<String> words = evaluator.prefixWords("aw");
        String temp = "";
        for(String oneWord: words)
            temp += oneWord + "\n";

        assertEquals("award\n" +
                "aware\n" +
                "away\n" +
                "awful\n", temp);
    }

    @Test
    void testPrefixWords13() throws FileNotFoundException {
        assertThrows(InvalidTrieException.class, () -> {
            Trie evaluator = new Trie("aWords.txt");
            evaluator.createDictionary();
            evaluator.build();
            ArrayList<String> words = evaluator.prefixWords("ae");

        });
    }

}
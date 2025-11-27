import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Trie_Starter implements TrieADT{
    private ArrayList<String> dictionary;
    private TrieNode root;
    private String filename;
    public Trie_Starter(String filename) throws FileNotFoundException {
        this.root = new TrieNode();
        this.dictionary = new ArrayList<>();
        this.filename = filename;
    }

    /**
     * method createDictionary
     * @throws FileNotFoundException
     */
    public void createDictionary() throws FileNotFoundException {
        // TODO: Populate "dictionary" by reading data from "filename" - use ArrayList's add method to add to the end of
        //  the dictionary ArrayList. DO NOT remove duplicate words.

    }

    /**
     * method build
     */
    public void build() {
        // TODO: Create a Trie data structure from "dictionary"
        //   Each TrieNode creates an object with a char "letter" and an ArrayList of TrieNodes "next"
        //   NOTE: the initial "next" ArrayList is empty. You will only add the necessary letters. Say you only have
        //         four words in your dictionary: ball, bat, bum and bump. Your trie would look like the following
        //                                  root
        //                                   |
        //                                   b
        //                                 /  \
        //                                a    u
        //                              /  \   |
        //                             l   t*  m*
        //                             |       |
        //                             l*      p*
        //   You begin by adding "ball" since it is the first word in "dictionary". I recommend setting a variable "current" to the root
        //   to traverse the trie.  First check if current "contains" a 'b'
        //   (we know it doesn't since the root ArrayList is empty but you will need to check) - this method is given in TrieNode.
        //   Since 'b' isn't in current's "next" ArrayList, add ALL the letters to the trie. Create a TrieNode for 'b' and add 'a' to its
        //   "next" ArrayList - you don't need to check if 'b' "contains" 'a' since we know the entire word "ball' is not in the trie and
        //   you will need to add all the letters.  Now, for 'a', add 'l' to its "next" ArrayList, and to 'l' add 'l' to its "next" ArrayList.
        //   Last, you will need to call the TrieNode "setWord" method to set the isWord data field to true since we know the second 'l' is a word (designated by * above).
        //   .
        //   We now move to the word "bat" and begin at the root again (i.e., set "current" to the root).  In this case "current" contains 'b' so I update "current"
        //   so that it is now pointing to 'b'. I check to see if the new "current" (i.e., 'b') contains an 'a' in its "next" ArrayList. It does!
        //   Therfore, update "current" to point to 'a'. I check to see if 'a' "next" ArrayList has a 't' - it does not.  Add 't'.  I'm at the end of my word so call
        //   TrieNode's "setWord" to change the isWord data field to true.
        //   .
        //   Continue stepping through "dictionary" until all words are in the trie.  My toString recursive methods will print out this trie and are unit tested.

        char letter;
        TrieNode current = root;

    }

    /**
     * method words (not recursive) - DO NOT CHANGE
     * calls overloaded recursive words that populates the "output" ArrayList of words in the trie
     * @return
     */
    public ArrayList<String> words() {
        ArrayList<String> output = new ArrayList<>();
        output = words(root, "", output);
        return output;
    }

    /**
     * method words (overloaded and recursive)
     * @param node
     * @param prefix
     * @param output
     * @return
     */
    public ArrayList<String> words(TrieNode node, String prefix, ArrayList<String> output) {
        // TODO: First check if the node completes a word. If so, add this "prefix" to output
        //  Now, recursively call "words"
        //  Step through node's "next" ArrayList (I assign to a temp variable)
        //  For each element, call words, building on the prefix (i.e., the new prefix is the current "prefix" plus the letter
        //  of the "next" element - assign this to output since you are building the output ArrayList of words



        return output;
    }

    /**
     * method prefixWords
     * @param prefix
     * @return
     */
    public ArrayList<String> prefixWords(String prefix) {
        // TODO: Use the non-recursive "words" method as a guide for "prefixWords".  You are wanting all the words that begin with a
        //  given "prefix" passed in as an argument (e.g., using my example in the build method, if "bu" is my prefix
        //  I would expect "bum" and "bump" in my "output" ArrayList
        //  Before calling the recursive "prefixWords" method within this non-recursive method, you must figure out the "current" TrieNode. In "words" you
        //  pass "root", but you don't want to do that here. First, you need to figure out how deep to traverse the trie for the given "prefix".
        //  For example, if your prefix is "bu" you should traverse the trie to the 'u' (current is 'b', then current is 'u').  You now
        //  have your starting point in the trie.
        //  Once you know "current' call the recursive  "prefixWords" method: output = prefixWords(current, prefix, "", output);
        //  Error Checking: If the prefix is not in the trie, throw an InvalidTrieException

        ArrayList<String> output = new ArrayList<>();
        TrieNode current = root;

        return output;
    }

    /**
     * method prefixWords (overloaded and recursive)
     * @param node
     * @param prefix
     * @param suffix
     * @param output
     * @return
     */
    public ArrayList<String> prefixWords(TrieNode node, String prefix, String suffix, ArrayList<String> output) {
        // TODO: Use the recursive "words" method as a guide for the recursive "prefixWords".  First check whether the node is a word.
        //  If it is, add the prefix plus the suffix to "output" (note that "prefix" is passed in as an argument AND never changes)
        //  Now, recursively call "prefixWords"
        //  Step through node's "next" ArrayList (I assign to a temp variable)
        //  For each element, call "prefixWords", building on the suffix (i.e., the new suffix is the current "suffix" plus the letter
        //  of the "next" element - assign this to output since you are building the output ArrayList of words


        return output;
    }

    /**
     * overloaded method toString (non-recursive & recursive) - GIVEN
     * prints the current trie (needed for unit tests)
     * @return
     */
    public String toString() {
        String output = "";
        TrieNode current = root;
        output = toString(root, "");
        return output;
    }
    public String toString(TrieNode node, String output) {
        ArrayList<TrieNode> temp = node.getNext();
        if(temp != null) {
            for (TrieNode oneNode : temp) {
                output = toString(oneNode, output+oneNode.getLetter()+" ");
            }
        }
        return output;
    }

    /**
     * method printDictionary - GIVEN
     * prints the words in the "dictionary"
     * @param start
     * @param end
     * @return
     */
    public String printDictionary(int start, int end) {
        String output = "";
        for(int i = start; i < end; i++) {
            output += this.dictionary.get(i) + "\n";
        }
        return output;
    }

}

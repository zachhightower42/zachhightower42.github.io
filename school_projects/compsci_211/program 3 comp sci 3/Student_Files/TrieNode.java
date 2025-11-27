import java.util.ArrayList;

public class TrieNode {
    private char letter;
    private ArrayList<TrieNode> next;
    private boolean isWord;

    public TrieNode() {
        this.letter = '@';
        this.next = new ArrayList<>();
        isWord = false;
    }
    public TrieNode(char letter) {
        this.letter = letter;
        this.next = new ArrayList<>();
        isWord = false;
    }

    public char getLetter() {
        return this.letter;
    }
    public ArrayList<TrieNode> getNext() {
        return this.next;
    }

    public boolean isWord() {
        return isWord;
    }

    public void setWord() {
        isWord = true;
    }

    public boolean contains(char letter) {
        for(TrieNode oneNode: next) {
            if (oneNode.getLetter() == letter)
                return true;
        }
        return false;
    }

    public TrieNode get(char letter) {
        for(int i = 0; i < next.size(); i++) {
            if (next.get(i).getLetter() == letter) {
                return next.get(i);
            }
        }
        return null;
    }
    public void add(char letter) {
        if(contains(letter))
            throw new InvalidTrieException();
        next.add(new TrieNode(letter));
    }
}

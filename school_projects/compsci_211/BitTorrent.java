// CSCI 211
// Zachary Hightower
// Student ID 10944120
// Program 4
// Due 11/15/2023
// In keeping with the UM Honor Code, I have neither given nor
// received assistance from anyone other than the instructor/TA/tutor.
// This program is meant to mimic the function of a bitTorrent client
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class BitTorrent {
    private HashMap<Integer, Piece> torrent;
    private HashMap<String, ArrayList<Integer>> index;
    private ArrayList<Piece> pieces;
    private ArrayList<Seed> swarm;
    private ArrayList<String> titles;
    private int peers;
    private String filename;



    public BitTorrent(String filename, int peers) {
        this.torrent = new HashMap<>();
        this.index = new HashMap<>();
        this.swarm = new ArrayList<>();
        this.titles = new ArrayList<>();
        this.peers = peers;
        this.filename = filename;
    }

    /**
     * method torrentPieces that reads from a file populating the torrent and index HashMaps
     * @throws FileNotFoundException
     */
    public void torrentPieces() throws FileNotFoundException {
        //TODO:  Read data in from the file - oneline represents one "piece" of the torrent
        //       Use count to keep track of the "order" of the Piece. If count is 0 you know that the line your read in is the title
        //       Add this title to the "titles" ArrayList (you can't add to "index" until your torrent is complete)
        //       If count is greater than 0 you should add the piece to the "torrent" hashmap and its hash to the "hash" ArrayList. Don't forget to increment count
        //       If the line your read in is "END", this is the end of this torrent - you now should add to the "index" hashmap
        //       You also need to reset count and hash for the next torrent.
        //
        int count = 0;
        String oneLine="", title = "";
        Scanner in = new Scanner(new File(this.filename));
        while (in.hasNextLine()) {
            oneLine = in.nextLine();
            //Check for the end of the torrent, placed at the beginning to prevent possible
            //errors resulting from iterating through if-else tree when unnecessary
            if (oneLine.equals("END")) {
                index.put(title, new ArrayList<>(torrent.keySet()));
                //Resets so that there are no errors in writing over multiple torrents
                count = 0;
                title = "";
            } else {
                if (count == 0) {
                    //Handles the title
                    title = oneLine;
                    titles.add(title);
                } else {
                    //Handles the body of the torrent by breaking each line
                    //into a different piece.
                    Piece piece = new Piece(count, title, oneLine);

                    //Hashes the piece we have
                    int pieceHash = piece.getOnePiece().hashCode();
                    torrent.put(pieceHash, piece);
                }
                count++;
            }
        }
        in.close();
    }


    /**
     * method stitch that combines the pieces based on the "order"
     * @param hash
     * @return
     */
    public String stitch(ArrayList<Integer> hash){
        //TODO:  Read in the hash values, sort by the "order" and stitch (i.e., combine), separating each piece with a \n (newline)
        //       I've provided the line that sorts, calling the private class PieceComparator that I've also given
        String output = "";
        //List for our pieces
        ArrayList<Piece> oneTorrent = new ArrayList<>();

        // Iterates over our hash array and grabs each piece before adding it into our oneTorrent
        //ArrayList, if the piece exists.
        for (Integer pieceHash : hash) {
            Piece piece = torrent.get(pieceHash);
            if (piece != null) {
                oneTorrent.add(piece);
            }
        }

        // Provided sort using PieceComparator
        Collections.sort(oneTorrent, new PieceComparator());

        // Adds each piece from the oneTorrent ArrayList onto the output with a newline
        //between each of them.
        for (Piece piece : oneTorrent) {
            output += piece.getOnePiece() + "\n";
        }

        return output;
    }

    /**
     * method tracker that adds the torrent to the swarm, duplicated
     * @param duplicates
     */
    public void tracker(int duplicates) {
        //TODO: DO NOT CHANGE THE seed on the random number generator
        // For each title:
        //    Retrieve the ArrayList of hash values from the "index" Hashmap
        //    Using this Arraylist, get the "pieces" from "Torrent"
        //    Now generate a random number from 0 to (peers-1). Recall the number of peers was defined in the constructor
        //    You are ready to add a "Seed" to the "swarm" ArrayList
        Random gen = new Random(17L);
        for (String title : titles) {
            //This retrieves the hash values from index
            ArrayList<Integer> hashes = index.get(title);

            //ArrayList for keeping track of used peer numbers
            ArrayList<Integer> usedPeerNumbers = new ArrayList<>();


                for (Integer hash : hashes) {
                    //Duplicate each hash according to the duplicates argument
                    for (int i = 0; i < duplicates; i++) {
                        //This is meant to generate a random peer number without repeats within
                        //the same title.
                        int peerNumber;

                        do {
                            peerNumber = gen.nextInt(peers);
                        } while (usedPeerNumbers.contains(peerNumber));

                        //Add the generated peer number to the list
                        usedPeerNumbers.add(peerNumber);

                    //Create a new Seed object and add it to the swarm
                    Seed seed = new Seed(title, hash, torrent.get(hash), peerNumber);
                    swarm.add(seed);
                }
                    //Clear the list for the next set of duplicates
                    usedPeerNumbers.clear();
            }
        }
    }
    //had issues in getting the correct output for the actual piece content in the right order
    //unresolved






    /**
     * method printTorrent given that prints the key and value of the torrent Hashmap
     * @return
     */
    public String printTorrent() {
        String output = "";
        for( Map.Entry<Integer, Piece> onePiece : torrent.entrySet() )
            output += onePiece.getKey() + ": " + onePiece.getValue() + "\n";

        return output;
    }

    /**
     * method printSwarm given that prints each seed in the "swarm" ArrayList
     * @return
     */
    public String printSwarm() {
        String output = "";
        Integer temp=0;
        for(Seed oneSeed: swarm) {
            if(temp != oneSeed.getHash()) {
                temp = oneSeed.getHash();
                output += oneSeed.getHash() + ": " + oneSeed.getPiece() + "\n" + oneSeed.getPeerNumber();
            }
            else {
                output += oneSeed.getPeerNumber() ;
            }
            output += "\n";
        }
        return output;
    }

    /**
     * private Piececomparator class used to sort a torrent's "pieces" based on its "order"
     */
    private class PieceComparator implements Comparator<Piece> {

        // override the compare() method
        public int compare(Piece p1, Piece p2)
        {
            if (p1.getOrder() == p2.getOrder())
                return 0;
            else if (p1.getOrder() > p2.getOrder())
                return 1;
            else
                return -1;
        }
    }
}

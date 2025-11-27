class ListNode:
    "ListNode class, each node has data and the reference to the next node"

    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    "class for single linked list: each node contain reference to next node"

    def __init__(self):
        "A LinkedList only has first node and last node "

        self.head = None
        self.tail = None

    def __len__(self):
        "count the number of list items"

        count = 0
        current_node = self.head

        while current_node is not None:
            count += 1
            current_node = current_node.next

        return count

    def is_empty(self):
        "check if the list is empty or not"

        if self.head is None:
            return True
        else:
            return False

    def push_back(self, item):
        "add item to end of list"

        # convert data type of item to ListNode data type
        if not isinstance(item, ListNode):
            item = ListNode(item)

        # when list is empty then the value being added becomes head, otherwise it becomes
        if self.head is None:
            self.head = item
            return
        # when list has 1 item
        elif self.tail is None:
            self.tail = item
            self.head.next = item
            return
        else:
            self.tail.next = item
            self.tail = item
            return

    def pop_back(self):
        "removes end item and returns its value"

        # edge case
        # when list is empty
        if self.head is None:
            raise IndexError

        # when list has 1 item, head is the last element
        if self.tail is None:
            head_value = self.head.data
            self.head = None
            return head_value

        # when list has 2 items, remove tail and return it
        if self.head.next is self.tail:
            tail_value = self.tail.data
            self.tail = None
            self.head.next = None
            return tail_value

        # when list has at least 3 items
        previous_node = None
        current_node = self.head

        # traverse the whole list to get the last node
        while current_node.next is not None:
            previous_node = current_node
            current_node = current_node.next

        tail_value = self.tail.data

        # current_node.next is none when current_node is the last node
        self.tail = previous_node
        previous_node.next = None

        return tail_value

    def push_front(self, value):
        "push an item to the front of the list"

        # convert data type of item to ListNode data type
        if not isinstance(value, ListNode):
            value = ListNode(value)

        # when list is empty
        if self.head is None:
            self.head = value
            return

            # when list has one element, has to fix tail when add new element
        if self.tail is None:
            self.tail = self.head
            self.tail.next = None
            self.head = value
            value.next = self.tail
            return

        # when list has at least 2 element
        value.next = self.head
        self.head = value

        return

    def pop_front(self):
        "remove front item and return its value"

        # when list is empty, return None, list remains unchanged
        if self.head is None:
            raise IndexError

        # when list has 1 item, return head value and remove head of list
        if self.tail is None:
            head_value = self.head.data
            self.head = None
            return head_value

        # when list has 2 items, return head value and remove head from list
        if self.head.next is self.tail:
            head_value = self.head.data
            self.head = self.tail
            self.head.next = None
            self.tail = None
            return head_value

        # when list has 3 items
        head_value = self.head.data

        # change head position of linked list
        self.head = self.head.next

        return head_value

    def __iter__(self):
        """
        Iterate over the linked list.
        """
        current = self.head
        while current is not None:
            yield current.data
            current = current.next

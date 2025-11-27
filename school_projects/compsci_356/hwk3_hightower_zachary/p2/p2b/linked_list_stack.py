from linked_list import LinkedList
class LinkedListStack:
    """Stack implementation based on chapter 4 from """

    def __init__(self):
        self.items = LinkedList()

    def is_empty(self):  # was isEmpty in book, but PEP 8 conventions suggest snake case.
        return self.items.is_empty()

    def push(self, item):
        self.items.push_back(item)

    def pop(self):
        return self.items.pop_front()

    def peek(self):
        tmp = self.items.pop_front()
        self.items.push_front(tmp)
        return tmp

    def __len__(self):
        return self.items.__len__()

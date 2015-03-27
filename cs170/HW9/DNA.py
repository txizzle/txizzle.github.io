import fileinput

def substringSieve(string_list): 
    #returns list with strings that are substrings of other substrings in list removed
    string_list.sort(key = lambda s: -len(s)) 
    out = []
    for s in string_list:
        if not any([s in o for o in out]):
            out.append(s)
    return out

def overlap(a,b):
    #returns largest overlap length between a (superstring) and b
    ov = 0
    for i in range(1, len(b)):
        if b[i:len(b)] == a[0:len(b)-i]:
            ov = len(b) - i
            break

    for j in range(1, len(a)):
        if b[0:(len(b) - j)] == a[(len(a)-len(b)+j):len(a)]:
            if (len(b) - j) > ov:
                ov = len(b) - j
            break
    return ov

def scs(a,b):
    #return the shortest common superstring of a and b
    #check if b is substring of a
    if len(b) <= len(a):
        if b in a:
            return a
    elif a in b:
        return b

    #suffix b with prefix a
    shortest = len(a) + len(b)
    for i in range(1, len(b)):
        if b[i:len(b)] == a[0:len(b)-i]:
            shortest = len(a) + i
            shortestcommon = b[0:i] + a
            break

    #prefix b with suffix a
    for j in range(1, len(a)):
        if b[0:(len(b) - j)] == a[(len(a)-len(b)+j):len(a)]:
            if (len(a)+j) < shortest:
                shortest = len(a) + j
                shortestcommon = a + b[(len(b)-j):len(b)]
            break
    return shortestcommon

reads = []
for line in fileinput.input():
    line = line.strip() # Remove the trailing newline
    reads.append(line) # Each line is a short read

reads = substringSieve(reads)
ovdict = {} #maps index of string to overlap with superstring

while len(reads) > 1:
    for i in range(1,len(reads)):
        ovdict[i] = overlap(reads[0], reads[i])
    index = max(ovdict, key=ovdict.get)
    reads[0] = scs(reads[0], reads[index])
    reads.remove(reads[index])
    ovdict = {}

answer = "".join(reads)
print(answer)
print(len(answer))

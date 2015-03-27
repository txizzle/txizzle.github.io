import fileinput

def substring(x,y):
	#checks if y is substring of x
	for i in range(0, len(x) - len(y) + 1):
		if y == x[i:i+len(y)]:
			return True
	return False

def substringSieve(string_list): 
	#assume string_list is sorted by decreasing length
    out = []
    for s in string_list:
        if not any([s in o for o in out]):
            out.append(s)
    return out

def scs(a,b):
	#a is the current shortest commmon superstring, we want to merge b with it

	#check if b is substring of a
	if len(b) < len(a):
		if substring(a,b):
			return a

	if a == b:
		return a

	if substring(b,a):
		return b

	shortest = len(a) + len(b)
	for i in range(1, len(b)):
		if b[i:len(b)] == a[0:len(b)-i]:
			shortest = len(a) + i
			shortestcommon = b[0:i] + a
			break

	for j in range(1, len(a)):
		if b[0:(len(b) - j)] == a[(len(a)-len(b)+j):len(a)]:
			if (len(a)+j) < shortest:
				shortest = len(a) + j
				shortestcommon = a + b[(len(b)-j):len(b)]
			break
	if shortest == len(a) + len(b):
		reads.remove(b)
		reads.append(b)
		return a
	return shortestcommon

reads = []
for line in fileinput.input():
    line = line.strip() # Remove the trailing newline
    reads.append(line)
reads.sort(key = lambda s: -len(s))  # Each line is a short read

reads = substringSieve(reads)
reads.sort(key = lambda s: len(s))

dna = reads[0]
for i in range(0, len(reads)):
	dna = scs(dna, reads[i])
	#print(dna)
print(dna)
print(len(dna))
answer = "".join(reads)

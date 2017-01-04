import sys, time, argparse
import RPi.GPIO as GPIO

on = "1111"
off = "1110"
one = "0111"
two = "1011"
three = "1101"
four = "1110"
pone = "10001110"
pzero = "10001000"

# Each 1 or 0 in one, two, on, off etc represents a series of 1s and 0s
def getsequence(s):
	seq = ""
	for c in s:
		if c == "1":
			seq += pone
		else:
			seq += pzero
	return seq

def sendcommand(pin, group, socket, command):
	# Build up the sequence to send
	seq = ""
	if group == "A":
		seq += getsequence(one)
	elif group == "B":
		seq += getsequence(two)
	elif group == "C":
		seq += getsequence(three)
	elif group == "D":
		seq += getsequence(four)

	if socket == 1:
		seq += getsequence(one)
	elif socket == 2:
		seq += getsequence(two)
	elif socket == 3:
		seq += getsequence(three)
	elif socket == 4:
		seq += getsequence(four)

	if command == "On":
		seq += getsequence(on)
	elif command == "Off":
		seq += getsequence(off)

	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(pin, GPIO.OUT)

	# Repeat 10 times to make sure the sequence goes through
	for repeat in range(10):
		for c in seq:
			if c == "1":
				GPIO.output(pin, GPIO.HIGH)
			else:
				GPIO.output(pin, GPIO.LOW)
			time.sleep(0.0002)

		# End sequences
		GPIO.output(pin, GPIO.HIGH)
		time.sleep(0.0002)
		GPIO.output(pin, GPIO.LOW)
		time.sleep(0.009)
	GPIO.cleanup()

if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("pin", type=int, choices=range(1, 26), help="Raspberry Pi Board Pin")
	parser.add_argument("group", choices=['A', 'B', 'C', 'D'], help="Socket Group: A, B, C, D")
	parser.add_argument("socket", type=int, choices=range(1, 4), help="Socket Number: 1 - 4")
	parser.add_argument("command", choices=['On', 'Off'], help="Command: On/Off")
	args = parser.parse_args()
	sendcommand(args.pin, args.group, args.socket, args.command)

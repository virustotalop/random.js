import unittest
import os
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

options = Options()
#options.add_argument("-headless")
driver = webdriver.Firefox(options=options)

file = "file://" + os.getcwd() + "/test.html"
print(file)
driver.get(file)

class TestRandom(unittest.TestCase):

	def test_next_int(self):
		self.assertEqual(driver.execute_script("var rand = new Random(100); return rand.nextInt(100);"), 15)
	#def test_next_int_no_args(self):
	#	self.assertEqual(driver.execute_script("var rand = new Random(100); return rand.nextInt();"), -1193959466)
	def test_next_boolean(self):
		self.assertEqual(driver.execute_script("var rand = new Random(100); return rand.nextBoolean();"), True)
	def test_next_double(self):
		self.assertEqual(driver.execute_script("var rand = new Random(100); return rand.nextDouble();"), 0.7220096548596434)
	def test_next_float(self):
		self.assertEqual(driver.execute_script("var rand = new Random(100); return rand.nextFloat();"), 0.7220096)

unittest.main()
driver.close()
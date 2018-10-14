import unittest
import os
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

options = Options()
options.add_argument("-headless")
driver = webdriver.Firefox(options=options)

file = "file://" + os.getcwd() + "/test.html"
print(file)
driver.get(file)

class TestRandom(unittest.TestCase):

	def test_next_int(self):
		self.assertEqual(driver.execute_script("var rand = new Random(100); return rand.nextInt(100);"), 15)
	def test_next_boolean(self):
		self.assertEqual(driver.execute_script("var rand = new Random(100); return rand.nextBoolean();"), True)
		
		

unittest.main()
driver.close()
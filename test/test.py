import unittest
import os
from selenium import webdriver

driver = webdriver.Firefox()

file = "file://" + os.getcwd() + "/test.html"
print(file)
driver.get(file)



class TestRandom(unittest.TestCase):

	def test_next_int(self):
		self.assertEqual(driver.execute_script("var rand = new Random(100); return rand.nextInt(100);"), 15) 
		
		

unittest.main()
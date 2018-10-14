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

print(driver.page_source)

class TestRandom(unittest.TestCase):

	def test_next_int(self):
		self.assertEqual(driver.execute_script("var rand = new Random(100); return rand.nextInt(100);"), 15)
		driver.close()
		
		

unittest.main()

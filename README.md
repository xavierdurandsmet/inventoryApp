# Inventory App


### Technologies used
- HTML
- CSS (no preprocessor)
- Javascript
- Jasmine

### Business Logic

- On changing modes (single/multi), I assumed the user was reinitializing the inputs for a new operation

- The input only accepts numbers, and the output returns 0 if the input is < 0

- In multi mode
	- On clicking the 'calculate all' button, it renders the outputs of each item that has input
	- On changing any input after having pressed the 'calculate all' button, I cleared all the outputs, in order for the user to get notified that the calculations are not longer valid and that he is to recalculate them

- I created a constructor function, on which I attached all different functionalities: I tried to modularize the code as much as possible (I am fully aware that the modularization is disportionate for a project this size, but I built the instanciation, focusing on scalability, pretending I was working on a large application). Moreover, I wanted to separate each functionality in methods, to be able to do unit testing on each

- I created a instance object, to bind the JS logic with the front-end/DOM

- Comments : I tried to make my code as clear as possible for someone who would jump right in the code base without prior information

### Testing

- I used Jasmine as a testing framework
- I tested methods attached on the Constructor prototype for unit testing (same comment here : the number of tests is very high compared to size of the app, but for the sake of the exercise, I tried to test as many methods as possible)
- How to run the tests :
	- go to directory path and type 'testem' in command line

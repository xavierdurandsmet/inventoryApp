describe("Main Constructor", function() {
  beforeEach(function() {
    obj = new Constructor();
  });

  it("should take the mode in its constructor", function() {
    expect(obj.mode).toEqual("single");
  });

  it("should take the memory in its constructor", function(){
    expect(obj.memory).toEqual({});
  });

  it("the changeMode function should change the mode to 'multi'", function() {
    obj.changeMode('multi');
    expect(obj.mode).toEqual("multi");
  });

  it("the changeMode function should change the mode to 'single' when mode is 'multi'", function() {
    obj.changeMode('multi');
    obj.changeMode('single')
    expect(obj.mode).toEqual("single");
  });

  it("has a calculate25 function that gives 25% of a number given", function(){
    var result = obj.calculate25
    expect(result(100)).toEqual(25);
  });

  it("has a giveOutput function uses the calculate25 function to output the right result", function(){
    spyOn(Constructor.prototype, "calculate25").and.callThrough();
    obj.giveOutput(100)
    expect(Constructor.prototype.calculate25).toHaveBeenCalled();
    expect(Constructor.prototype.calculate25).toHaveBeenCalledWith(100);
  });

  it("has a addToMem function uses the giveOutput function to add the output to memory (general case)", function(){
    spyOn(Constructor.prototype, "giveOutput").and.callThrough();
    obj.addToMem('A', 100);
    expect(Constructor.prototype.giveOutput).toHaveBeenCalled();
    expect(obj.memory).toEqual({ A: ({ price: 100, markup: 25 }) })
  });

  it("has a addToMem function uses the giveOutput function to add the output 0 to memory (edge case)", function(){
    spyOn(Constructor.prototype, "giveOutput").and.callThrough();
    obj.addToMem('A', 'abc');
    expect(Constructor.prototype.giveOutput).not.toHaveBeenCalled();
    expect(obj.memory).toEqual({ A: ({ price: 'abc', markup: 0 }) })
  });

});

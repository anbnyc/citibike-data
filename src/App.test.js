import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App file', function() {

  // window.navigator = {
  //   geolocation: {}
  // };

  // window.navigator.geolocation.getCurrentPosition = jest.fn();
  // window.navigator.geolocation.getCurrentPosition.mockReturnValue({
  //   coords: {
  //     latitude: 40.0,
  //     longitude: -70.0
  //   }
  // });

  describe('handleUserInput', function(){

  });

  describe('componentWillMount', function(){


  });

  describe('render', function(){
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
    });
  });

});



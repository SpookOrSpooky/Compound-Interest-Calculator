import React from 'react';
import renderer from 'react-test-renderer';
import InputGraphSection from "../Components/InputGraphSection";

test('Value changes when new, appropriate value is inserted', () =>{
    const component = renderer.create(<InputGraphSection/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


        });
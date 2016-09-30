import { _ } from 'meteor/underscore';

export const getInfo = ({ id, people, relationships }) => {
  console.log(people);
  console.log(id);
  const person = _.select(people, (pers) => {
    return pers._id === id;
  });
  console.log(person);
};

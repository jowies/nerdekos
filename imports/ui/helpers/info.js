import { _ } from 'meteor/underscore';

const personById = ({ id, people }) =>
  _.find(people, (pers) =>
    pers._id === id
  );

const relationshipsById = ({ id, relationships, type }) =>
  _.select(relationships, (relationship) =>
    (relationship.type === type
      && (relationship.people[0] === id
        || relationship.people[1] === id)
    )
);

const relationshipsPeople = ({ id, people, relationships, type }) => {
  const relations = relationshipsById({ id, relationships, type });
  return relations.map((relation) => {
    const otherPerson = (relation.people[0] === id) ? relation.people[1] : relation.people[0];
    return personById({ id: otherPerson, people });
  });
};

const eskimosiblings = ({ id, people, relationships, ligg }) => {
  const eskimos = [];
  for (let i = 0; i < ligg.length; i++) {
    const relations = relationshipsPeople({
      id: ligg[i]._id,
      people,
      relationships,
      type: 'ligg',
    });
    for (let j = 0; j < relations.length; j++) {
      if (relations[j]._id !== id) {
        eskimos.push(relations[j]);
      }
    }
  }
  return _.uniq(eskimos);
};

const getInfo = ({ id, people, relationships }) => {
  const info = {};
  info.person = personById({ id, people });
  if (info.person) {
    info.klin = relationshipsPeople({ id, people, relationships, type: 'klin' });
    info.ligg = relationshipsPeople({ id, people, relationships, type: 'ligg' });
    info.eskimosiblings = [];
    if (info.ligg.length > 0) {
      info.eskimosiblings = eskimosiblings({ id, people, relationships, ligg: info.ligg });
    }
  }
  console.log(info);
  return info;
};

export default getInfo;


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

const eskimosiblings = ({ id, people, relationships, hooks }) => {
  const eskimos = [];
  for (let i = 0; i < hooks.length; i++) {
    const relations = relationshipsPeople({
      id: hooks[i]._id,
      people,
      relationships,
      type: 'hook',
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
  if (info.person.approvedRelationships > 0) {
    info.hooks = relationshipsPeople({ id, people, relationships, type: 'hook' });
    info.ligg = relationshipsPeople({ id, people, relationships, type: 'ligg' });
    if (info.hooks.length > 0) {
      info.eskimosiblings = eskimosiblings({ id, people, relationships, hooks: info.hooks });
    }
  }
  return info;
};

export default getInfo;


import test from 'node:test';
import assert from 'node:assert/strict';
import { MISSIONS } from '../data/missions';
import { filterMissions, projectCoordinates } from './filterMissions';

test('returns all 18 missions when no filters are active', () => {
  const result = filterMissions(MISSIONS, {
    destination: 'All',
    category: 'All',
    status: 'All',
    search: '',
  });
  assert.equal(result.length, 18);
});

test('filters by destination Moon, Mars, and Deep Space', () => {
  const moon = filterMissions(MISSIONS, { destination: 'Moon', category: 'All', status: 'All', search: '' });
  const mars = filterMissions(MISSIONS, { destination: 'Mars', category: 'All', status: 'All', search: '' });
  const deep = filterMissions(MISSIONS, { destination: 'Deep Space', category: 'All', status: 'All', search: '' });

  assert.equal(moon.length, 8);
  assert.equal(mars.length, 8);
  assert.equal(deep.length, 2);
});

test('filters by status Active on Mars', () => {
  const activeMars = filterMissions(MISSIONS, {
    destination: 'Mars',
    category: 'All',
    status: 'Active',
    search: '',
  });
  assert.equal(activeMars.length, 2);
  assert.deepEqual(
    activeMars.map((m) => m.id).sort(),
    ['curiosity-msl', 'perseverance-ingenuity']
  );
});

test('searches across mission name, site, and instruments', () => {
  const seismometer = filterMissions(MISSIONS, {
    destination: 'All',
    category: 'All',
    status: 'All',
    search: 'SEIS Seismometer',
  });
  assert.equal(seismometer.length, 1);
  assert.equal(seismometer[0].id, 'insight-lander');
});

test('projects planetary coordinates within bounds', () => {
  const apollo11 = projectCoordinates(0.67416, 23.47314);
  assert.ok(apollo11.x > 50 && apollo11.x < 60);
  assert.ok(apollo11.y > 45 && apollo11.y < 55);

  // Opportunity has 354.47° E which normalizes to -5.53°
  const opportunity = projectCoordinates(-1.95, 354.47);
  assert.ok(opportunity.x > 45 && opportunity.x < 52);
});

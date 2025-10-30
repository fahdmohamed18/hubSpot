// HubSpot Workflow Custom Code Action (Node.js)
// npm package required: @hubspot/api-client
// Secret required in the action: HUBSPOT_ACCESS_TOKEN
// Inputs to map in the action: email, firstname, lastname

const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
  try {
    const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error('HUBSPOT_ACCESS_TOKEN is not set as a secret.');
    }

    const hs = new hubspot.Client({ accessToken });

    const email = event.inputFields?.email;
    const firstname = event.inputFields?.firstname;
    const lastname = event.inputFields?.lastname;

    if (!email) {
      throw new Error('email is required (map the Email property to input fields).');
    }

    // 1) Search by email
    const searchRes = await hs.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            { propertyName: 'email', operator: 'EQ', value: email }
          ]
        }
      ],
      properties: ['email', 'firstname', 'lastname']
    });

    if (searchRes.total > 0) {
      // 2) Update if exists
      const id = searchRes.results[0].id;
      await hs.crm.contacts.basicApi.update(id, {
        properties: {
          ...(firstname ? { firstname } : {}),
          ...(lastname ? { lastname } : {})
        }
      });
      return callback({
        outputFields: { action: 'updated', contactId: id, email }
      });
    } else {
      // 3) Create if not found
      const created = await hs.crm.contacts.basicApi.create({
        properties: {
          email,
          ...(firstname ? { firstname } : {}),
          ...(lastname ? { lastname } : {})
        }
      });
      return callback({
        outputFields: { action: 'created', contactId: created.id, email }
      });
    }
  } catch (e) {
    console.error('[Custom Code] Error:', e?.response?.data || e.message);
    throw e; // surface the error in workflow history
  }
};

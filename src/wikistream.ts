import WikimediaStream from 'wikimedia-streams'
// import MediaWikiRecentChangeEvent from 'wikimedia-streams/build/streams/MediaWikiRecentChangeEvent'
import { Kafka, logLevel } from 'kafkajs'

// "recentchange" can be replaced with any valid stream
const stream = new WikimediaStream('recentchange')
const kafka = new Kafka({
  clientId: 'archserver',
  brokers: ['archserver.local:9092', 'archserver.local:9093', 'archserver.local:9094'],
  logLevel: logLevel.ERROR
})

const producer = kafka.producer()
await producer.connect()

stream
  .filter('mediawiki.recentchange')
  .all({ wiki: 'enwiki' }) // Edits from English Wikipedia.
  .on(async (data /* MediaWikiRecentChangeEvent & { wiki: 'enwiki' } */, _) => {
    // Output page title
    // console.log(data.title)
    const str = data.title

    const key = /^[A-M]/i.test(str.charAt(0)) ? 'A-M' : 'N-Z'
    // console.log('sending to kafka with key: ', key)
    await producer.send({
      topic: 'wikiupdates',
      messages: [
        {
          key,
          value: data.title
        }
      ]
    })
  })

// consumer here
const consumer = kafka.consumer({ groupId: 'g1' })
await consumer.connect()

await consumer.subscribe({ topics: ['wikiupdates'] })

await consumer.run({
  eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
    console.log(`g1: [${topic}]: PART:${partition}:`, message?.value?.toString())
  }
})

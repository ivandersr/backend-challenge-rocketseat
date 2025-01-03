import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface SendMessageArgs {
  topic: string;
  message: string;
  producer: ClientKafka;
}

export const sendMessageToTopic = ({
  topic,
  message,
  producer,
}: SendMessageArgs) => {
  firstValueFrom(producer.send(topic, message));
};

<?php 

namespace App\EventListener;

use App\Entity\User;
use Symfony\Component\HttpFoundation\RequestStack;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener 
{
    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function updateJwtData(JWTCreatedEvent $event)
    {
        /** @var User */
        $user = $event->getUser();
        $payload = $event->getData();
        
        $payload['firstname'] = $user->getFirstname();
        $payload['lastname'] = $user->getLastname();

        $event->setData($payload);
    }
}
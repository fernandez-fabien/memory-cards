<?php

namespace App\Events;

use App\Entity\Box;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class BoxUserSubscriber implements EventSubscriberInterface
{
    /** @var Security */
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForBox', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForBox(ViewEvent $event)
    {
        $box = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($box instanceof Box && $method == "POST") {
            $currentUser = $this->security->getUser();
            $box->setUser($currentUser);
        }
    }
}
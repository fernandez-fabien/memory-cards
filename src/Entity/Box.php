<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\BoxRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=BoxRepository::class)
 * @ApiResource(
 *  normalizationContext={"groups"={"boxes_read"}},
 *  denormalizationContext={"disable_type_enforcement"=true},
 *  subresourceOperations={
 *     "api_boxes_cards_get_subresource"={
 *         "method"="GET",
 *         "normalization_context"={"groups"={"boxes_cards_read"}}
 *     }
 *  }
 * )
 */
class Box
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"cards_read", "boxes_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Assert\Length(min=3, max=255)
     * @Groups({"cards_read", "boxes_read", "users_read"})
     */
    private $title;

    /**
     * @ORM\OneToMany(targetEntity=Card::class, mappedBy="box", orphanRemoval=true)
     * @Groups({"boxes_read"})
     * @ApiSubresource
     */
    private $cards;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="boxes")
     * @Groups({"boxes_read"})
     */
    private $user;

    public function __construct()
    {
        $this->cards = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection|Card[]
     */
    public function getCards(): Collection
    {
        return $this->cards;
    }

    public function addCard(Card $card): self
    {
        if (!$this->cards->contains($card)) {
            $this->cards[] = $card;
            $card->setBox($this);
        }

        return $this;
    }

    public function removeCard(Card $card): self
    {
        if ($this->cards->contains($card)) {
            $this->cards->removeElement($card);
            // set the owning side to null (unless already changed)
            if ($card->getBox() === $this) {
                $card->setBox(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
